export const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const formatEta = (mins: number) => {
  return `${mins} mins`;
};

export const formatDistance = (km: number) => {
  return `${km.toFixed(1)} km`;
};
