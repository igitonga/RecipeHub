import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return(
        <div className="flex items-center justify-center h-screen">
            <ClipLoader
                color="indigo"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader;