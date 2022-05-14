export const useCenterFunctions = () => {
  const formatAddress = (address: string) => {
    const i = address.indexOf(',') - 6;

    return (
      address.substring(0, i) +
      '\n' +
      address.substring(i, address.length)
    ).replace(',', '');
  };

  return {
    formatAddress,
  };
};
