import * as React from 'react';

export interface FormProps {
  handleSubmit: (e: any) => Promise<void>;
  handleOnchange1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnchange2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fightStarted: boolean;
  setFightStarted: (p: any) => void;
}

export default function Form(props: FormProps) {
  if (props.fightStarted) {
    return (
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => props.setFightStarted(false)}
      >
        Abort fight!{' '}
      </button>
    );
  }

  return (
    <form
      onSubmit={props.handleSubmit}
      className="flex space-x-5 justify-center"
    >
      <input
        className="
	  form-control
	  block
	  px-3
	  py-1.5
	  text-base
	  font-normal
	  text-gray-700
	  bg-white
	  bg-clip-padding
	  border
	  border-solid
	  border-gray-300
	  rounded
	  transition
	  ease-in-out
	  m-0
	  focus:text-gray-700
	  focus:bg-white
	  focus:border-blue-600 
	  focus:outline-none"
        onChange={props.handleOnchange1}
        type="text"
        name="pokemon1"
        placeholder="First Pokémon"
      />
      <input
        className="
	  form-control
	  block
	  px-3
	  py-1.5
	  text-base
	  font-normal
	 text-gray-700
	 bg-white 
	  bg-clip-padding
	  border
	  border-solid
	 border-gray-300
	  rounded
	  transition
	  ease-in-out
	  m-0
	 focus:text-gray-700
	 focus:bg-white
	 focus:border-blue-600 
	 focus:outline-none"
        onChange={props.handleOnchange2}
        type="text"
        name="pokemon2"
        placeholder="Second Pokémon"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        FIGHT!
      </button>
    </form>
  );
}
