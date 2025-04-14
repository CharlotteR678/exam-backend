import { validate } from "class-validator";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { CreateCountryInput } from "../entities/CountryInput";

@Resolver()
export class CountriesResolver {
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryById(
    @Arg("id", () => ID) id: number
  ): Promise<Country | null> {
    const country = await Country.findOne({
      where: { id },
    });
    return country;
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CreateCountryInput) data: CreateCountryInput
  ): Promise<Country> {
    const newCountry = new Country();
    const errors = await validate(data);
    if (errors.length > 0) {
      const errorMessages = errors
        .map(
          (err) =>
            `Field: ${err.property}, Constraints: ${JSON.stringify(
              err.constraints
            )}`
        )
        .join("");
      throw new Error(errorMessages);
    }
    Object.assign(newCountry, data);
    await newCountry.save();
    return newCountry;
  }
}
