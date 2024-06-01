interface ICard {
  price: number;
  setIsEnabled: (value: boolean) => void;
}

export default function Card({ price, setIsEnabled }: ICard) {
  return (
    <div className="flex flex-col w-fit bg-[#141414] bg-opacity-70 border border-neutral-800 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6">
      <span className="w-[15rem] h-[5rem] flex bg-gradient-to-br from-indigo-400 via-amber-400 to-sky-400 rounded-xl items-center justify-center">
        <p className="text-neutral-700 blur-[3px] font-bold text-lg select-none">
          Storage Deals 📦
        </p>
      </span>
      <span className="flex flex-row justify-between items-center mt-3">
        <span className="flex flex-row items-center gap-1.5 text-white text-xl font-medium w-[46%] truncate">
          {price} <p className="text-blue-400">FIL</p>
        </span>
        <button
          onClick={() => {
            setIsEnabled(true);
          }}
          className="bg-gradient-to-br from-[#4557ff] from-[20%] to-[#00a7c8] hover:from-[#3e4fea] hover:from-[20%] hover:to-[#1ca1bc] font-medium items-center rounded-lg px-4 py-1 text-white"
        >
          Redeem
        </button>
      </span>
    </div>
  );
}