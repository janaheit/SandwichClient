enum OrderStatus {
  UNFILLED = "Hasn't ordered yet",
  ORDERED = "Has ordered",
  NOSANDWICH = "Doesn't want a sandwich",
  HANDELED = "Already eaten",
}

enum Options {
  RAUWKOST="Rauwkost",
  GRILLEDVEGGIES="Gegrilde Groentjes",
  CLUB="Club",
  NOBUTTER="Zonder boter",
}

const OptionsMapper = new Map<Options, string>([
  [Options.RAUWKOST, 'RAUWKOST'],
  [Options.GRILLEDVEGGIES, 'GRILLEDVEGGIES'],
  [Options.CLUB, "CLUB"],
  [Options.NOBUTTER, "NOBUTTER"]
]);

enum BreadType {
  GREY="grijs",
  WHITE="wit",
  SOMETHING="Completely different"
}
