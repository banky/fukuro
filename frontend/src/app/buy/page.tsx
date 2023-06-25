import { NFTList } from "../../components/NFTList";

function Page() {
  return (
    <>
      <div className="max-w-4xl min-h-50 mx-auto ">
        <h1 className="text-center text-6xl">
          Buy and sell token bundles with ease
        </h1>
        <NFTList />
      </div>
    </>
  );
}

export default Page;
