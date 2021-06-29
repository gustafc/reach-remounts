# `@reach/router` behavior change from 1.2.1 to 1.3.4

Repro for https://github.com/reach/router/issues/478

- Start with `yarn && yarn start`. You are now running with @reach/router 1.3.4.
- Click around on the links. You will see the log filling up with message about
  unmounting/mounting for every link you click (except when you go from
  `/id/123` to `/id/456` or vice versa).
- Stop the server
- `yarn add @reach/router@1.2.1`
- `yarn start`
- Click around on the links. You will only see unmounting/mounting messages when
  you go to/from the "Other component" link.
