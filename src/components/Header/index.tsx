import logo from '../../assets/Logo.svg';

export const Header = () => {
  return (
    <header className="bg-black h-52 mx-auto w-full flex justify-center items-center">
      <picture className="flex justify-center items-center">
        <img className="w-32 h-12" src={logo} alt="rocket with todo written on it" />
      </picture>
    </header>
  );
};
