import AsideCalender from "./AsideCalender";
import { useAppDispatch } from "../store/hooks";
import { openModal } from "../store/slices/modalSlice";

export default function Aside() {

    const dispatch = useAppDispatch();
    
    const handleCreateButton = () => {
        dispatch(openModal());
    }

  return (
    <aside>
      <button className="create-button row cursor-pointer" onClick={handleCreateButton}>
        <img src="/icons/plus.svg" alt="plus icon" />
        Create
      </button>
      <AsideCalender />
    </aside>
  );
}
