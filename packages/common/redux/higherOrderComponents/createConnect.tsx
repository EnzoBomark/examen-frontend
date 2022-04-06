import { connect, Connect } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createConnect({ context }: { context: any }): Connect {
  return (
    mapStateToProps?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    mapDispatchToProps?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    mergeProps?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    providedOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) =>
    connect(mapStateToProps, mapDispatchToProps, mergeProps, {
      ...providedOptions,
      context,
    });
}
