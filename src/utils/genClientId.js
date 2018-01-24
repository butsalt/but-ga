import uuid from 'uuid/v4';

export default function genClientId() {
  return uuid();
}