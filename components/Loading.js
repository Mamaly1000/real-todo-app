const Loading = () => {
  return (
    <div className="flex flex-col gap-1   w-full min-h-[500px] justify-center items-center">
      <div className="flex flex-wrap w-[50px] h-[50px] gap-[1px] justify-between items-center">
        <div className="min-w-[20px] min-h-[20px] rounded-full bg-violet-600 animate-pulse"></div>
        <div className="min-w-[20px] min-h-[20px] rounded-full bg-violet-700 animate-pulse"></div>
        <div className="min-w-[20px] min-h-[20px] rounded-full bg-violet-800 animate-pulse"></div>
        <div className="min-w-[20px] min-h-[20px] rounded-full bg-violet-900 animate-pulse"></div>
      </div>
      <span className="capitalize text-white animate-pulse">loading ...</span>
    </div>
  );
};

export default Loading;
