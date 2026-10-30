/**
 * A stage picture made of type, for what has no picture of its own: one figure or name set large
 * on the stage's field, with a caption. Never decoration — it states a fact from the content.
 */
export function StageCard({ figure, caption, detail }: { figure: string; caption: string; detail?: string }) {
  return (
    <div className="stage-card">
      <p className="stage-card__figure">{figure}</p>
      <p className="stage-card__caption">{caption}</p>
      {detail && <p className="stage-card__detail">{detail}</p>}
    </div>
  );
}
