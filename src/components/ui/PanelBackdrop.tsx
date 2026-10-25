import Image from 'next/image';

export type PanelBackdropName = 'metal' | 'fog' | 'horizon';

/**
 * The equinox behind a call-to-action panel: light gathers on the right, the
 * copy side stays dark. Put it as the first child of a `relative overflow-hidden`
 * panel whose content sits in `relative` wrappers.
 */
export default function PanelBackdrop({ name, from = 'from-surface-container-low' }: { name: PanelBackdropName; from?: string }) {
  return (
    <>
      <Image
        src={`/media/backgrounds/${name}.webp`}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right opacity-70 pointer-events-none"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${from} via-black/60 to-transparent pointer-events-none`} />
    </>
  );
}
