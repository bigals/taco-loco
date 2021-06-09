# TacoLoco

This is the developer overview for the Taco Loco App, including both run commands for review, as well as a short breakdown of Alex's time spent on the exercise/development process

## Serve the Application

Run `yarn start`, at the root of the project, in order to spin up the simple json-server implementation on port 3000, and in parallel, via npm-run-all, also build/serve the angular application with livereload/auto-open on port 4000.
If your browser doesn't immediately open to http://localhost:4000, you should be able to manually do so, once the app has finished building.

## Running the Test Suite

This application was developed in a TDD fashion for key features, and as such has a small set of unit tests with base code coverage. To run the tests, run `yarn test` at the root of the project. Tests are minimal in places, and specifically I would probably focus on testing both the HeaderComponent, as well some of the container components more thoroughly in the next iteration/sprint or two.

## Time Management/Tracking for submission

In total I spent about 12 total hours on this assignment as a whole,

- The first hour primarily dedicated to json-server setup/familiarizing myself with its config again.
- The last 2 hours of development was spent on increasing code coverage in key areas, adding in jsDoc style comments where I missed them on first pass, documentation of this guide/process, and other general self-review polish.
- Leaving about 9 total working hours on the actual implementation/initial TDD, which was spread out over two days sporadically between other obligations/appointments. This time probably could have been expedited slightly with less context switching, but also was somewhat par for the course in a normal business setting with sprint ceremonies, meetings, etc. It also could have seen speed improvements if I leveraged libraries such as bootstrap/material/etc., but wanted to keep the solution as thin/simple as possible without adding unnecessary dependencies.

## Final Thoughts and Areas to Improve Next

I attempted to step back and look at both the need of the specification at hand, but also where this particular feature/sub-app might fit into a larger picture, as well as think of how the feature set may need to change over time. I did a number of things throughout development to try and set this app up for as much success as possible over time.

- It wasn't specified directly, nor asked for, but with little effort I was able to take a mobile-first approach to the scss that I mocked up quickly, and the application should be functional on mobile devices as well.

- With any sort of realistic data set of deliveries, I naturally thought that some sort of filtering would be somewhat critical. json-server happens to support full text search with a query param, so I decided to support the same in the main deliveries route, and provide a search filter interface so that the list of deliveries could be searched for a particular record a user is after.

- While the specification simply asked for a way to delete, edit, update, get details etc. I tried to make them available in a few places instead of one, to improve the UX for multiple user personas.

  - An "Add delivery" button is present on the deliveries list, as well as on the deliveries details page
  - Deleting deliveries can be done from the deliveries list itself, while also inside deliveries details page
  - The Edit form for a delivery can be accessed from the deliveries list, or from the deliveries details page
  - I took navigation a step further and produced a clickable breadcrumb in the header of the application for easy navigation.

- I created a separate presentational/dummy component for the delivery card/items in the list, as I could see the application growing to track/support other various properties of a delivery, such as order, quantities, price, has the customer paid, etc. Having the card component already separated out will allow that display to become richer, and richer, while still keeping concerns of the actual data access/updating to the container component that is rendering all of the cards.

There is certainly room for iteration, and improvement in any application, and taco-loco is no exception. Some of the biggest areas of improvement that I might prioritize first, given the chance, would be:

- Cypress tests would be a fantastic addition to test some of the happy paths for the app execution.
- Unit test coverage could be improved in container components to test some of the async pieces of those components.
- Develop a more holistic global button/form set of styles for consistent look and feel, and ease of developer experience.
- Add a modal component, rather than rely on the browser confirmation dialog, both for design reasons, but also UX considerations as some users are conditioned to fear the browser based dialogs
- Pull out the Breadcrumb nav into its own component that HeaderComponent uses. The current implementation is simplistic, but would not work/get complex quickly for long paths/deep routes.
- The delivery card components should better handle the mobile scenarios, as things are a tad scrunched on the smallest displays
