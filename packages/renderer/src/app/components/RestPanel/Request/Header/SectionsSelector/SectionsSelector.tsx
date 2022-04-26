import { Setter } from '@/app/types/Setter';
import style from './SectionsSelector.module.scss';

type SectionName = 'Body' | 'Headers' | 'Query' | 'Authorization' | 'Documentation';

interface Props {
  selected: SectionName;
  setSelected: Setter<SectionName>;
}

export const SectionsSelector: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <div className={style.SectionsSelector}>
      {(['Body', 'Headers', 'Query', 'Authorization', 'Documentation'] as const).map(name => (
        <div className={style.option + ' ' + (selected === name ? style.active : '')} key={name} onClick={() => setSelected(name)}>
          {name}
        </div>
      ))}
    </div>
  );
};
