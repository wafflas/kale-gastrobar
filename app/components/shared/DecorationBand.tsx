import HorizontalDecoration from "./HorizontalDecoration";

export default function DecorationBand() {
  return (
    <div className="mt-5">
      <HorizontalDecoration
        text="The feeling of being in the right place. • The feeling of being in the right place. "
        direction="left"
        size={70}
      />
      <HorizontalDecoration
        text="The feeling of being in the right place. • The feeling of being in the right place. "
        direction="right"
        size={70}
      />
    </div>
  );
}
