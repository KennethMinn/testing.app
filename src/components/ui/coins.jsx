import Image from "./image";

const Coins = ({ creditCoin, airdropCoin, coinSize = 15, fontSize = "lg" }) => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src="/new_design/icons/m_coin.webp"
        className={`w-[${coinSize}px] h-[${coinSize}px]`}
      />
      <p className={`text-legend text-label-${fontSize}`}>{creditCoin}</p>
      <Image
        src="/new_design/icons/airdrop_coin.webp"
        className={`w-[${coinSize}px] h-[${coinSize}px]`}
      />
      <p className={`text-airdrop text-label-${fontSize}`}>{airdropCoin}</p>
    </div>
  );
};

export default Coins;
