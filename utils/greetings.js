const greetings = () => {
  const date = new Date();
  const hours = date.getHours();

  let greeting;
  if (hours < 12) {
    greeting = "Good morning";
  } else if (hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good night";
  }

  return greeting;
};

export default greetings;
