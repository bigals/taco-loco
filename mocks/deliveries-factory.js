module.exports = () => {
  const data = { deliveries: [] };
  const sampleCustomers = [
    { name: "Ron Burgundy", address: "38394 Rich Mahogany Way" },
    { name: "Veronica Corningstone", address: "123 News Anchor Ln." },
    { name: "Brick Tamland", address: "123 Nowhere Pl." },
    { name: "Jean Girard", address: "123 FancyPants St." },
    { name: "Cal Naughton Jr.", address: "875 Talladega St." },
    { name: "Prestige Worldwide", address: "1987 Midwick Drive" },
    { name: "Luke Skywalker", address: "84839 Tattoine Ave." },
    { name: "Dale Doback", address: "1987 Midwick Drive" },
    { name: "Brennan Huff", address: "1987 Midwick Drive" },
    { name: "Rey Palpatine", address: "9839 Jakku Rd." },
    { name: "Han Solo", address: "133 Corellia Blvd." },
    { name: "Ricky Bobby", address: "874 Talladega Rd." },
    { name: "Leia Organa", address: "786 Alderran St." },
    { name: "Luke Skywalker", address: "84839 Tattoine Ave." },
    { name: "Will Farrell", address: "123 Somewhere St." },
  ];

  // Create 200 deliveries
  for (let i = 1; i < 200; i++) {
    const randomCustomerId = Math.floor(
      Math.random() * (sampleCustomers.length - 1)
    );
    data.deliveries.push({
      id: i,
      customer: sampleCustomers[randomCustomerId].name,
      address: sampleCustomers[randomCustomerId].address,
    });
  }
  return data;
};
