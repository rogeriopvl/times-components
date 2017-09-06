import React from "react";
import pick from "lodash.pick";
import { graphql } from "react-apollo";

const identity = a => a;

const flatten = l =>
  l.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const getQueryVariables = definitions =>
  flatten(
    definitions.map(definition =>
      (definition.variableDefinitions || [])
        .map(variable => variable.variable.name.value)
    )
  );

const connectGraphql = (query, propsToVariables = identity) => {
  const variableNames = getQueryVariables(query.definitions);
  class Children extends React.Component {
    constructor(props) {
      super(props);

      this.state = props;
    }

    componentWillReceiveProps(nextProps) {
      return this.setState(nextProps);
    }

    render() {
      const { data = {}, children, ...props } = this.state;

      const { error, loading, ...result } = data;

      return children(
        Object.assign(
          props,
          {
            error,
            loading
          },
          result
        )
      );
    }
  }

  const Component = props => {
    const variables = pick(propsToVariables(props), variableNames);

    const Graphql = graphql(query, {
      options: {
        variables
      }
    })(Children);

    return <Graphql {...props} />;
  };

  return Component;
};

export default connectGraphql;
