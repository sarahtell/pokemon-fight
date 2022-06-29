import { capitalize } from 'lodash';
import Select, { ActionMeta, SingleValue } from 'react-select';

export interface FormProps {
  handleSubmit: (e: any) => void;
  handleOnchange1:
    | ((
        newValue: SingleValue<{
          value: string;
          label: string;
        }>,
        actionMeta: ActionMeta<{
          value: string;
          label: string;
        }>
      ) => void)
    | undefined;
  handleOnchange2:
    | ((
        newValue: SingleValue<{
          value: string;
          label: string;
        }>,
        actionMeta: ActionMeta<{
          value: string;
          label: string;
        }>
      ) => void)
    | undefined;
  fightStarted: boolean;
  handleReset: (p: any) => void;
  error: string | undefined;
  allPokemons: string[];
  hasSelectedPokemons: boolean;
}

export default function Form(props: FormProps) {
  const options = props.allPokemons.map(p => {
    return { value: p, label: capitalize(p) };
  });

  if (props.fightStarted) {
    return (
      <div className="flex flex-col space-y-5">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={props.handleReset}
        >
          Abort fight!{' '}
        </button>
        {props.error && (
          <p>
            <strong>{props.error}</strong>
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={props.handleSubmit}
      className="flex w-1/2 space-x-5 justify-center"
    >
      <Select
        options={options}
        placeholder={'First Pokémon'}
        onChange={props.handleOnchange1}
        className="w-1/3"
      />
      <Select
        options={options}
        placeholder={'Second Pokémon'}
        className="w-1/3"
        onChange={props.handleOnchange2}
      />
      <button
        type="submit"
        className={
          props.hasSelectedPokemons
            ? 'bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        }
        disabled={props.hasSelectedPokemons}
      >
        FIGHT!
      </button>
    </form>
  );
}
