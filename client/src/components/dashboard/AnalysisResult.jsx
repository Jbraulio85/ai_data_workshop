import { HiChartBar, HiTable, HiDocumentText } from 'react-icons/hi';
import { cn } from '../../lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';
import { useState, useEffect } from 'react';

export const AnalysisResult = ({ queryResult, loading }) => {
  // Determinar si hay datos para mostrar
  const hasData =
    queryResult &&
    queryResult.result !== null &&
    queryResult.result !== undefined;

  // Función para formatear nombres de roles
  const formatRoleName = (name) => {
    return name
      .replace('_ROLE', '')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when result changes
  useEffect(() => {
    setCurrentPage(1);
  }, [queryResult]);

  // Determinar el tipo de resultado
  const getResultType = () => {
    if (!queryResult?.result) return 'empty';

    const result = queryResult.result;
    if (Array.isArray(result)) {
      if (
        result.length === 1 &&
        result[0].hasOwnProperty('count') &&
        Object.keys(result[0]).length === 1
      ) {
        return 'count';
      }
      if (
        result.length > 1 &&
        result.length <= 20 &&
        hasAggregateColumn(result)
      ) {
        return 'chart';
      }
      return 'table';
    }
    if (typeof result === 'number') return 'number';
    if (typeof result === 'object') return 'object';
    return 'text';
  };

  // Función auxiliar para detectar si el array tiene columna de agregado (para gráficos)
  const hasAggregateColumn = (arr) => {
    if (arr.length === 0) return false;
    const keys = Object.keys(arr[0]);
    return keys.some(
      (key) =>
        key.toLowerCase().includes('count') ||
        key.toLowerCase().includes('total') ||
        key.toLowerCase().includes('sum') ||
        key.toLowerCase().includes('avg') ||
        key.toLowerCase().includes('cantidad') ||
        key.toLowerCase().includes('suma') ||
        key.toLowerCase().includes('promedio'),
    );
  };

  const resultType = getResultType();

  const renderResult = () => {
    switch (resultType) {
      case 'empty':
        return (
          <div className="text-center text-slate-400">
            No hay resultados para mostrar
          </div>
        );

      case 'table':
        if (
          !Array.isArray(queryResult.result) ||
          queryResult.result.length === 0
        ) {
          return (
            <div className="text-center text-slate-400">
              No se encontraron resultados
            </div>
          );
        }

        const headers = Object.keys(queryResult.result[0]);
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-indigo-400 uppercase"
                    >
                      {header.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const startIndex = (currentPage - 1) * itemsPerPage;
                  const endIndex = startIndex + itemsPerPage;
                  const paginatedRows = queryResult.result.slice(
                    startIndex,
                    endIndex,
                  );
                  return paginatedRows.map((row, index) => (
                    <tr
                      key={startIndex + index}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      {headers.map((header) => (
                        <td
                          key={header}
                          className="px-4 py-3 text-sm text-slate-300"
                        >
                          {String(row[header])}
                        </td>
                      ))}
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
            {queryResult.result.length > itemsPerPage && (
              <div className="mt-4 flex items-center justify-between px-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-slate-300">
                  Página {currentPage} de{' '}
                  {Math.ceil(queryResult.result.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(queryResult.result.length / itemsPerPage)
                  }
                  className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        );

      case 'number':
        return (
          <div className="text-center text-slate-400">
            Operación completada: {queryResult.result} filas afectadas
          </div>
        );

      case 'count':
        const countData = [
          { name: 'Total', value: queryResult.result[0].count },
        ];
        return (
          <div className="flex flex-col items-center">
            <h4 className="mb-4 text-lg font-semibold text-white">
              Resultado del Conteo
            </h4>
            <BarChart width={400} height={300} data={countData}>
              <defs>
                <linearGradient id="countGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  border: '1px solid #374151',
                }}
              />
              <Bar dataKey="value" fill="url(#countGradient)">
                <LabelList
                  dataKey="value"
                  position="center"
                  fill="#ffffff"
                  fontSize={16}
                  fontWeight="bold"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                />
              </Bar>
            </BarChart>
          </div>
        );

      case 'chart':
        const keys = Object.keys(queryResult.result[0]);
        const numericKey = keys.find(
          (key) =>
            typeof queryResult.result[0][key] === 'number' ||
            (typeof queryResult.result[0][key] === 'string' &&
              !isNaN(queryResult.result[0][key])),
        );
        const stringKey = keys.find(
          (key) =>
            typeof queryResult.result[0][key] === 'string' &&
            isNaN(queryResult.result[0][key]),
        );
        const chartData = queryResult.result.map((row) => ({
          name: formatRoleName(row[stringKey] || 'Categoría'),
          value: Math.round(Number(row[numericKey])) || 0,
        }));
        return (
          <div className="flex flex-col items-center">
            <h4 className="mb-4 text-lg font-semibold text-white">
              Distribución de Datos
            </h4>
            <BarChart width={500} height={300} data={chartData}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  border: '1px solid #374151',
                }}
              />
              <Bar dataKey="value" fill="url(#chartGradient)">
                <LabelList
                  dataKey="value"
                  position="center"
                  fill="#ffffff"
                  fontSize={14}
                  fontWeight="bold"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                />
              </Bar>
            </BarChart>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p className="text-slate-300">{String(queryResult.result)}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div
        className={cn(
          'flex min-h-[300px] w-full flex-col items-center justify-center',
          'rounded-3xl border-2 border-dashed border-white/5 bg-white/2 p-8 text-center',
        )}
      >
        <div className="max-w-md space-y-4">
          <div
            className={cn(
              'mx-auto flex h-16 w-16 items-center justify-center rounded-2xl',
              'animate-pulse bg-indigo-500/20 text-indigo-400',
            )}
          >
            <HiChartBar size={32} />
          </div>
          <h3 className="text-xl font-semibold text-slate-300">
            Procesando tu consulta...
          </h3>
          <p className="text-sm text-slate-500">
            La IA está analizando los datos y generando la respuesta.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex min-h-[300px] w-full flex-col rounded-3xl border border-white/10',
        'bg-white/5 p-8 backdrop-blur-sm',
      )}
    >
      {!hasData ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div
            className={cn(
              'mx-auto flex h-16 w-16 items-center justify-center rounded-2xl',
              'bg-slate-800 text-slate-600',
            )}
          >
            <HiChartBar size={32} />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-300">
            Esperando tu consulta
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Escribe una pregunta arriba para empezar el análisis de datos con
            IA.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 opacity-50">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                <HiDocumentText />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Texto
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                <HiTable />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Tablas
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                <HiChartBar />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Gráficos
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              {resultType === 'table' ? (
                <HiTable />
              ) : resultType === 'object' ? (
                <HiDocumentText />
              ) : (
                <HiChartBar />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Resultado del Análisis
              </h3>
              <p className="text-sm text-slate-400">
                {resultType === 'table'
                  ? `${Array.isArray(queryResult.result) ? queryResult.result.length : 0} resultados encontrados`
                  : 'Análisis completado'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-black/20 p-6">
            {renderResult()}
          </div>
        </div>
      )}
    </div>
  );
};
