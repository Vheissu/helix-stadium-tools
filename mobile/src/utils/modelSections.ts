export type ModelChannelMode = 'mono' | 'stereo' | null;

export type ModelWithKey = {
  key?: string | null;
};

export type ModelSection<TModel> = {
  title: string | null;
  models: TModel[];
};

export const getModelChannelMode = (model: ModelWithKey): ModelChannelMode => {
  const key = model.key ?? '';
  if (/Mono(?:\d|_|$)/.test(key)) return 'mono';
  if (/Stereo(?:\d|_|$)/.test(key)) return 'stereo';
  return null;
};

export const groupModelsByChannel = <TModel extends ModelWithKey>(models: TModel[]): ModelSection<TModel>[] => {
  const mono: TModel[] = [];
  const stereo: TModel[] = [];
  const other: TModel[] = [];

  models.forEach((model) => {
    const mode = getModelChannelMode(model);
    if (mode === 'mono') {
      mono.push(model);
      return;
    }
    if (mode === 'stereo') {
      stereo.push(model);
      return;
    }
    other.push(model);
  });

  if (!mono.length || !stereo.length) {
    return [{ title: null, models }];
  }

  const sections: ModelSection<TModel>[] = [
    { title: 'Mono', models: mono },
    { title: 'Stereo', models: stereo },
  ];
  if (other.length) {
    sections.push({ title: 'Other', models: other });
  }
  return sections;
};
