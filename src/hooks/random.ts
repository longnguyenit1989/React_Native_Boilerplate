const useRandom = (length: number) => {
  const char: string =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArr = Array.from(
    {length: length},
    () => char[Math.floor(Math.random() * char.length)],
  );
  return randomArr.join('');
};

export default useRandom;
