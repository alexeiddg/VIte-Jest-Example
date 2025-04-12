/* Exercise 2: Test using snapshots */

/* Mock the function using jest.fn().
Write three tests inside a describe block. You should use import the superHeros[] and getFlyingSuperHeros function.

1. First Test:
Test should return an empty array if no superheros have the 'Fly' power"
2. Second Test:
Test should return an array of superHeros that have the 'Fly' power"
3. Third Test:
Test should match the snapshot of flying superheros.
The snapshot file should contain the expected output of the test.
The snapshot should be saved in a __snapshots__ directory next to the test file.
The snapshot file should be named SuperHeros.test.ts.snap.
*/

test("dummy test", () => {
  expect(true).toBe(true);
});

import { getFlyingSuperHeros } from "./getFlyingSuperHeros.ts";
import { superHeros } from "./superHeros.ts";

const mockGetFlyingSuperHeros = jest.fn(getFlyingSuperHeros);

describe("getFlyingSuperHeros Snapshot Tests", () => {
  it("should return an empty array if no superheroes have the 'Fly' power", () => {
    const noFlyHeros = [
      { name: "Hulk", power: ["Super Strength", "Regeneration"] },
      { name: "Wolverine", power: ["Regeneration", "Claws"] },
      { name: "SpiderMan", power: ["Agility", "Spider-Sense"] },
    ];
    const result = mockGetFlyingSuperHeros(noFlyHeros);
    expect(result).toEqual([]);
  });

  it("should return an array of superheroes that have the 'Fly' power", () => {
    const flyingHeros = mockGetFlyingSuperHeros(superHeros);
    const expected = [
      { name: "Superman", power: ["Fly", "Super Strength"] },
      {
        name: "IronMan",
        power: ["Intelligence", "Technology", "Fly", "Billionaire"],
      },
      { name: "GreenLantern", power: ["Energy Manipulation", "Fly"] },
    ];
    expect(flyingHeros).toEqual(expected);
  });

  it("should match the snapshot of flying superheroes", () => {
    const flyingHeros = mockGetFlyingSuperHeros(superHeros);
    expect(flyingHeros).toMatchSnapshot();
  });
});
