const formatMoney = (value = 0) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  
  if (value % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  
  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(value / 100);
};

export default formatMoney;
