export const getPageInfo = ({ meta }) => {
  const {
    current_page: current,
    last_page: last,
    per_page: rows,
    total: count,
  } = meta;

  return {
    info: {
      current: Number(current),
      last: Number(last),
      count: Number(count),
      rows: Number(rows),
      pages: Math.ceil(Number(count) / Number(rows)),
    },
  };
};
