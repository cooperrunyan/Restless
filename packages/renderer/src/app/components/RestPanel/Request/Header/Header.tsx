import { getRequest } from '../../../../db/get/request';
import { Bang } from '../../../../types/Bang';
import style from './Header.module.scss';
import { SectionsSelector } from './SectionsSelector/SectionsSelector';
import { UrlBar } from './UrlBar/UrlBar';
import { Setter } from '../../../../types/Setter';
import { ContentType } from './ContentType/ContentType';

type SectionName = 'Body' | 'Headers' | 'Query' | 'Authorization' | 'Documentation';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
  selected: SectionName;
  setSelected: Setter<SectionName>;
}

export const Header: React.FC<Props> = ({ request, selected, setSelected }) => {
  if (!request) return <></>;

  return (
    <div className={style.Header}>
      <UrlBar request={request} />
      <SectionsSelector selected={selected} setSelected={setSelected} />
      {selected === 'Body' && <ContentType contentType={request.contentType as any} />}
    </div>
  );
};
