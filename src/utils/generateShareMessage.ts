import {Item} from '../screens/ScreenList';

export default function generateShareMessage(
  headerTitle: string,
  list: Item[],
) {
  return `${headerTitle} (${list.length})\n${list
    .map(item => {
      if ('date' in item) {
        return (
          (item?.done ? '\u2611' : '\u2610') +
          ' ' +
          item?.title +
          (item?.description ? '\n' + item.description : '') +
          (item?.date ? '\n' + new Date(item.date).toLocaleDateString() : '') +
          (item?.time
            ? (item?.date ? ' ' : '\n') +
              new Date(item.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '') +
          '\n'
        );
      } else {
        return (
          (item.done ? '\u2611' : '\u2610') +
          ' ' +
          item.title +
          (item.description ? '\n' + item.description : '') +
          '\n'
        );
      }
    })
    .join('')}`;
}
