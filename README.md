### How did you decide what to show on the main page vs details?

* Home shows a three-card Active carousel and a Retired section for quick scanning.
* No filters on Home; one clear “View All” button routes to the full list.
* The details view is a popup with project name, UNIC identifier, vintage, status, and a “Download Certificate” button only when retired.
* Summary on Home, full context and actions in the popup or the All Credits page.

### What design choices did you make to keep it clean (code design)?

* Clear structure: `pages/`, `components/`, `utils/`.
* Made use of shared components to avoid any code dupliaction. 
* Simple data flow: props down, minimal local state, guarded rendering when data is missing.
* Styling separated via CSS variables; behavior stays in JavaScript.

### If the system had 10,000 credits, how would you keep the dashboard fast?
Scenario: we will be adding a data base for so many credits

* Pre-filter and pre-aggregate data views
* Cache query results
* Using batch processing instead of real-time processing
* Use a CDN for all static assets
* Ensure your servers are stateless so they can scale horizontally. This usually involves thinking carefully about how you do user sessions.
* Invest in a good load balancer
* Optimise for faster read performance
* Minimize latency, by ensuring that data and servers are in the same physical datacenter and that they are as close to your users as possible
* Use microservices, where appropriate. Certain parts of your application architecture will likely have very little usage. Other parts will probably struggle to keep up with the load. By splitting these up into independent systems, you can optimize your resources accordingly

