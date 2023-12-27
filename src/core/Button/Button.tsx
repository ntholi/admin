import React from 'react';

type Props = {
  text: string;
};
export default function Button({ text }: Props) {
  return <div>{text}</div>;
}
