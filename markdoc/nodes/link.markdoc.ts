import { CodeBlock } from '@/components/CodeBlock';
import Link from '@/components/Link';
import { nodes } from '@markdoc/markdoc';

export const link = {
  render: Link,
  attributes: nodes.link.attributes
};
