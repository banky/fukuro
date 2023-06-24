export function Page() {
  return (
    <>
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-8xl mt-40 flex flex-wrap w-fit items-center justify-center">
          <div className="my-4">Buy and sell token</div>
          <div className="bg-purple-600 mx-4 my-4 p-4 py-2 rounded-xl">
            {" "}
            bundles{" "}
          </div>
          <div className="my-4"> with ease</div>
        </h1>
        <p className="text-center">
          The worlds first marketplace that natively supports ERC 6551 token
          bound accounts. Cheaply trade accounts with unlimited possiblility
        </p>
      </div>

      <div></div>
    </>
  );
}

export default Page;
