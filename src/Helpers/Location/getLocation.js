const getLocation = () => {
  if (!navigator.geolocation) {
    return 'geolocation is not available in this browser';
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
    );
  });
};

export default getLocation;
