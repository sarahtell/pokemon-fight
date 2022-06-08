import { interpolate, useCurrentFrame } from "remotion";
import { Skills } from "./PokemonPresentation"

type SkillsTableProps = {
    name: string,
    skills: Skills
}


export function SkillsTable(props: SkillsTableProps): JSX.Element {
    const frame = useCurrentFrame()
    const opacity = interpolate(
        frame,
        [50, 100],
        [0, 1]
    );
    return (

        <div
            className={`pt-8 text-center mx-8`}
            style={{ opacity }}
        >
            <p className="capitalize font-bold">{props.name}</p>
            <p>
                {'HP'}: {props.skills.hp}
            </p>
            <p>
                {'Attack'}: {props.skills.attack}
            </p>
            <p>
                {'Defense'}: {props.skills.defense}
            </p>
            <p>
                {'Speed'}: {props.skills.speed}
            </p>
        </div>
    )

}