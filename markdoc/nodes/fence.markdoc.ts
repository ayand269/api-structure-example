import { CodeBlock } from '@/components/CodeBlock';
import { nodes } from '@markdoc/markdoc';

export const fence = {
  render: CodeBlock,
  attributes: {
    ...nodes.fence.attributes,
    title: { type: String, render: 'title', required: true }
  },
};
