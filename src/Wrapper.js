import "moment/locale/en-gb";
import "moment/locale/id";
import { useToast } from "./Contexts/Toast";
import { useLoading } from "./Contexts/Loading";

import Toast from "./Components/Toast";
import { Loading } from "./Components/Loading";

import App from './App';

const Wrapper = () => {
  const { toast, closeToast } = useToast();
  const { isLoading } = useLoading();

  return (
    <>
    <Loading isOpen={isLoading} />
    <Toast isOpen={toast.isOpen} onClose={closeToast} message={toast.message} />
    <App />
    </>
  );
}

export default Wrapper;
