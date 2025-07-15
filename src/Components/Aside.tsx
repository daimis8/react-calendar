import AsideCalender from "./AsideCalender";

export default function Aside() {
  return (
    <aside>
      <button className="create-button row cursor-pointer">
        <img src="/icons/plus.svg" alt="plus icon" />
        Create
      </button>
      <AsideCalender />
    </aside>
  );
}
