//This is a utility function to format currency
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const formatCurrency = (value: number) => currencyFormatter.format(Number(value));

export default formatCurrency;
