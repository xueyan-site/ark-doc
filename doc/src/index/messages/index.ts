import { ArticleMeta } from 'xueyan-react-doc';

export default <ArticleMeta[]> [
  {
    id: '111',
    label: 'yang@xueyan.site',
    src: XT_PATH + 'xueyan-site.svg'
  },
  {
    id: '222',
    label: 'yang@xueyan.site',
    src: XT_PATH + 'xueyan-site.svg',
    href: 'https://xueyan.site',
  },
  {
    id: '333',
    label: 'Github repository',
    src: XT_PATH + 'github.png',
    children: [
      {
        id: '444',
        label: 'Github repository',
        src: XT_PATH + 'github.png',
        href: 'https://xueyan.site'
      }
    ]
  }
]