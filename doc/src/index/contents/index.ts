import { ArticleMeta } from 'xueyan-react-doc';
import IMAGE_IMG from './back.jpg'

export default <ArticleMeta[]> [
  {
    id: '1111',
    label: 'doc1',
    content: () => import('./doc1')
  },
  {
    id: '2222',
    label: 'yang@xueyan.site',
    content: () => import('./doc2')
  },
  {
    id: '3333',
    label: 'Github repository',
    banner: IMAGE_IMG,
    content: () => import('./doc3'),
    children: [
      {
        id: '4444',
        label: 'Github repository',
        content: () => import('./doc4')
      }
    ]
  }
]