import { Skills } from "../App"
import { getRounds } from "../lib/round"

const pokemon1Name: string = 'Boris'
const pokemon2Name: string = 'Bodil'

describe("tests rounds", () => {
    it("returns 1 round", () => {
        const pokemon1Skills: Skills = { attack: 10, defense: 10, hp: 10, speed: 10 }
        const pokemon2Skills: Skills = { attack: 20, defense: 20, hp: 20, speed: 20 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds.length).toBe(1)
    })

    it("returns 3 rounds", () => {
        const pokemon1Skills: Skills = { attack: 10, defense: 10, hp: 10, speed: 10 }
        const pokemon2Skills: Skills = { attack: 5, defense: 20, hp: 20, speed: 20 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds.length).toBe(3)
    })

    it("starts with pokemon 1", () => {
        const pokemon1Skills: Skills = { attack: 10, defense: 10, hp: 10, speed: 30 }
        const pokemon2Skills: Skills = { attack: 5, defense: 20, hp: 20, speed: 20 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds[0].attacker).toBe('Boris')
    })

    it("starts with pokemon 2", () => {
        const pokemon1Skills: Skills = { attack: 10, defense: 10, hp: 10, speed: 10 }
        const pokemon2Skills: Skills = { attack: 5, defense: 20, hp: 20, speed: 20 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds[0].attacker).toBe('Bodil')
    })

    it("never returns hp less than zero for last round for Pokemon 1", () => {
        const pokemon1Skills: Skills = { attack: 10, defense: 10, hp: 10, speed: 10 }
        const pokemon2Skills: Skills = { attack: 5000, defense: 20, hp: 20, speed: 100 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds[rounds.length - 1].pokemon1Skills.hp).toBe(0)
    })

    it("never returns hp less than zero for last round for Pokemon 2", () => {
        const pokemon1Skills: Skills = { attack: 1000, defense: 10, hp: 10, speed: 50 }
        const pokemon2Skills: Skills = { attack: 5, defense: 20, hp: 20, speed: 10 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds[rounds.length - 1].pokemon2Skills.hp).toBe(0)
    })

    it("returns the initial hp for each round", () => {
        const pokemon1Skills: Skills = { attack: 3, defense: 10, hp: 10, speed: 50 }
        const pokemon2Skills: Skills = { attack: 5, defense: 20, hp: 20, speed: 10 }
        const rounds = getRounds(pokemon1Skills, pokemon2Skills, pokemon1Name, pokemon2Name)
        expect(rounds[0].pokemon2Skills.initialHp).toBe(20)
        expect(rounds[0].pokemon2Skills.hp).toBe(17)
    })

})