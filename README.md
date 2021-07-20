[TOC]

## What's new in Vue.js 3?

- More maintainable: The Vue.js code base has been re-written in TypeScript for maintainability, and the internals are more modular.
- Faster: Vue.js 3 is faster and has better performance than Vue.js 2. The new version has a new proxy-based reactivity system.
- Smaller: Vue.js has tree shaking; tree shaking is a method to remove unused libraries from the project automatically. This capability is essential to make the file size smaller than the previous version. Vue.js 3 also has some compile-time flags that allow you to drop things that cannot automatically be tree-shaken.
- Scales better: Vue.js now provides the Composition API, an easier way to reuse a segment of Vue.js component logic. The Composition API is an exciting new feature that solves complex use cases such as sharing business logic between components.
- A better developer experience: For me, Vue.js already provided unparalleled developer experience, but Vue.js has improved it in Vue.js 3 (by introducing the new single-file component improvements, type checking for template expressions, and props of sub-components).

## What's new in ASP.NET Core?

Here is a rough list of what has been added to the new ASP.NET Core web framework:

- Performance Improvements to HTTP/2: .NET 5 improves the performance of HTTP/2 by adding support for HPack dynamic compression of HTTP/2 response headers in Kestrel.
- Reduction in container image sizes: Sharing layers between two images dramatically reduces the size of the aggregate images that you pull. This reduction is achieved by re-platting the SDK image on the ASP.NET runtime image.
- Reloadable endpoints via configuration for Kestrel: Kestrel can now observe changes to configurations passed to KestrelServerOptions.Configure. Then it can be applied to any new endpoints without restarting your application.
- JSON extension methods for HttpRequest and HttpResponse: Using the new ReadFromJsonAsync and WriteAsJsonAsync extension methods, you can
  now easily consume and use JSON data from HttpRequest and HttpResponse. The JSON extension methods can also be written with an endpoint routing to create JSON APIs like so:

```c#
endpoints.MapGet("/weather/{city:alpha}",
  async context => {
    var city = (string) context.Request
      .RouteValues["city"];
    var weather = GetFromDatabase(city);
    await context.Response.WriteAsJsonAsync(weather);
  });
```

- An extension method allows anonymous access to an endpoint: The AllowAnonymous extension allows anonymous access to an endpoint when using endpoint routing. In the following code, the extension method, AllowAnonymous(), is chained after calling the MapGet method:

```c#
public void Configure(IApplicationBuilder app,
  IWebHostEnvironment env) {
  app.UseRouting();
  app.UseAuthentication();
  app.UseAuthorization();
  app.UseEndpoints(endpoints => {
    endpoints.MapGet("/", async context => {
      await context.Response
        .WriteAsync("Hello Packt!");
    }).AllowAnonymous();
  });
}
```

- Custom handling of authorization failures: With the new IAuthorizationMiddlewareResultHandler interface invoked by AuthorizationMiddleware, custom handling of authorization failures is now easier than before. You can now register a custom handler in the dependency injection container that allows developers to customize HTTP responses.
- SignalR Hub filters: Similar to how middleware lets you run code before and after an HTTP request, Hub Pipelines in ASP.NET SignalR is the feature that allows you to run code before and after Hub methods are called.
- Updated debugging for Blazor WebAssembly: No need for a VS Code JS debugger extension for developing Blazor WebAssembly apps.
- Blazor accessibility improvements: Input components that derive from InputBase now automatically render aria-invalid (an HTML validation attribute) on failed validation.
- Blazor performance improvements: This includes optimized .NET runtime execution, JSON serialization, JavaScript interop, and component rendering.
- Kestrel socket transport support for additional endpoint types: The System.Net.Sockets transport in Kestrel now allows you to bind to both Unix domain sockets and existing file handles.
- Azure Active Directory authentication with Microsoft.Identity.Web: Any ASP.NET Core project templates can now easily integrate with Microsoft.Identity.Web to handle authentication with Azure AD.
- Sending HTTP/2 PING frames: Microsoft added the ability to send periodic PING frames in Kestrel by setting limits on KestrelServerOptions, which are Limits.Http2.KeepAlivePingInterval and Limits.Http2.KeepAlivePingTimeout, as shown in the following code:

```c#
public static IHostBuilder CreateHostBuilder(string[] args) =>
  Host.CreateDefaultBuilder(args)
  .ConfigureWebHostDefaults(webBuilder => {
    webBuilder.ConfigureKestrel(options => {
      options.Limits.Http2.
      KeepAlivePingInterval = TimeSpan
        .FromSeconds(10);
      options.Limits.Http2.
      KeepAlivePingTimeout = TimeSpan
        .FromSeconds(1);
    });
    webBuilder.UseStartup < Startup > ();
  });
```

- Custom header decoding in Kestrel: Microsoft also added the ability to specify which System.Text.Encoding to use to interpret incoming headers based on the header name instead of defaulting to UTF-8, like so:

```c#
public static IHostBuilder CreateHostBuilder(string[] args) =>
  Host.CreateDefaultBuilder(args)
  .ConfigureWebHostDefaults(webBuilder => {
    webBuilder.ConfigureKestrel(options => {
      options.RequestHeaderEncodingSelector =
        encoding => {
          switch (encoding) {
          case "Host":
            return System.Text
              .Encoding
              .Latin1;
          default:
            return System.Text
              .Encoding
              .UTF8;
          }
        };
    });
    webBuilder.UseStartup < Startup > ();
  });
```

- CSS isolation for Blazor components: Blazor now supports scoped CSS styles inside a component.
- Lazy loading in Blazor WebAssembly: Use the OnNavigateAsunc event on the Router component to lazy load assemblies for a specific page.
- Set UI focus on Blazor apps: Use the FocusAsync method on ElementReference to set the UI focus on an element.
- Control Blazor component instantiation: IComponentActivator can be used to control how Blazor components are instantiated.
- Influencing the HTML head in Blazor apps: Add dynamic link and meta tags by using the built-in Title, Link, and Meta components in the head tags of a Blazor app.
- Protected browser storage: ProtectedLocalStorage and ProtectedSessionStorage can be used to create a secure persisted app state in local or session storage.
- Model binding and validation with C#9 record types: You can use Record types to model data transmitted over the network like so:

```c#
public record Person([Required] string Name,
  [Range(0, 150)] int Age);
public class PersonController {
  public IActionResult Index() => View();
  [HttpPost]
  public IActionResult Index(Person person) {
    // ...
  }
}
```

You can see the record type after the public access modifier.

- Improvements to DynamicRouteValueTransformer: You can now pass state to DynamicRouteValueTransformer and filter the set of chosen endpoints.
- Auto-refresh with dotnet watch: The ASP.NET Core project will now both launch the default browser and auto-refresh it as you make changes to your code while running dotnet watch.
- Console Logger Formatter: The console logger formatter gives the developer complete control over the formatting and colorization of the console output.
- JSON Console Logger: Microsoft added a built-in JSON formatter that emits structured JSON logs to the console.

### Clean Architecture

Clean architecture is a principle of organizing software architecture to keep developers away from the difficult refactoring of the application in the future. Clean architecture helps you build a service for a specific domain model that prepares it for microservice architecture.

| <img src="https://1.bp.blogspot.com/-HXPcinc-2Qg/YPXv8EkM8OI/AAAAAAAADOw/l1526dXa9f4EHay8ioawkhRzZWG4XYPwwCLcBGAsYHQ/s0/Clean%2Barchitecture%2Bdiagram.png" alt="Clean architecture diagram" style="zoom:25%;" /> | <img src="https://1.bp.blogspot.com/-0FNfMMKEozA/YPXyQtpfjZI/AAAAAAAADO4/E2jAB_qy-RMdEdAbLgwcxMLcwC2iVRz4gCLcBGAsYHQ/s0/A%2Bflat%2Bdiagram%2Bof%2Bclean%2Barchitecture.png" style="zoom: 50%;" /> |
| :----------------------------------------------------------: | :----------------------------------------------------------: |

In clean architecture, two layers must be the core or center of the structure. These layers are the domain layer, which contains most of your entities, enums, and settings. The application layer keeps most of your Data Transfer Objects (DTOs), interfaces, mappings, exceptions, behaviors, and business logic.

- The core folder will have Application and Domain projects.
- The infrastructure folder will have Data and Shared projects.
- The presentation folder will have a WebApi project.

#### The core layer – directory

The core layer is the center of clean architecture. All other project dependencies must point toward the core to the domain and application project to be specific. Similarly, the core layer will never depend on any other layers. To set up the core layer, we need two projects – the Domain and Application projects.

##### Domain – project

This clean architecture part is a class library project with entities, interfaces, enums, DTOs, and so on.
The Domain project must have an empty project reference, which shows that it does not have any dependencies on any project.

##### Application – project

This part of the clean architecture is also a class library project. It has defined interfaces, but the implementations are outside of this layer. This project also has the command and queries of the CQRS pattern, the behaviors of MediatR, the profile of AutoMapper, exceptions, models, and so on.

#### The infrastructure layer – directory

The infrastructure layer has the class implementations of interfaces defined in the Application project. Resources such as SMTP, filesystems, or web services are samples of the application's external dependencies but implemented in this layer. This layer is another directory inside the solution while holding multiple projects. The projects we will add here are for data and shared projects.
To set up the infrastructure layer, we will need two projects – Data and Shared.

##### Data – project

This part of the infrastructure layer is a class library project intended for a database. You can also name this data project to a persistence project; persistence and data are intractable.

##### Shared – project

This part of the infrastructure layer is also a class library project. This project will include shared code between different services, such as Email, SMS, or Date Time.

#### The presentation layer – directory

The presentation layer is where you build your web application. The web application can use ASP.NET Core MVC, ASP.NET Core Web API, a Single-Page Application (SPA), or a mobile application.

##### WebApi – project

This project interacts with any client-side applications, such as on the web, mobile, desktop, and Internet of Things (IoT). Also, WebApi depends on both the Application and infrastructure layers.

##### client-app – non-project web application

client-app is the web application that serves as the user interface of the application.

#### Managing tests – directories

This section is not part of the clean architecture principle, but the best practice is to use separation of concerns. Hence, organizing the test projects based on the tests they do, such as unit tests, functional tests, integration tests, and load testing, is the best practice.

##### Unit test – project

A Unit test project tests small and specific parts of your code. This project can be created using an XUnit, NUnit, or MSTest project.

##### Integration test – project

An Integration test project tests whether the components are working together. This project can be created using an XUnit, NUnit, or MSTest project.

## CQRS (Command and Query Responsibility Segregation)

The pattern would be an ideal candidate for how to separate all the requests for reading and all the requests for modifying data.

Everything in the controller that gets data or does not mutate data falls under Query; while everything else that mutates data, such as POST, PUT, and DELETE requests, is classified as Command.

<img src="https://1.bp.blogspot.com/-YskP1PgI1KQ/YPbCELNuabI/AAAAAAAADPA/PmS4tyxnv_EiPqErj0CSY_Tnnq1TjSFQACLcBGAsYHQ/s0/A%2Bcontroller%2Bsending%2Ba%2Bcommand.png" alt="A controller sending a command" style="zoom: 25%; float:left;" />

A controller sending a command

The ultimate goal is to bring a GET request and have a post, like in the preceding figure, to end up in a mediator. This mediator will find a query handler and a command handler to handle the requests, and through that, the controller won't need to know if any service is injected into handlers.
The design makes the application more manageable and way more testable because you can unit test the handlers isolated from the whole controller. After all, there is nothing in the controller. The controller just has a query sent to the mediator and eventually lands in a handler, but it's a very decoupled approach and remarkably predictable for your application.

### What Is The Mediator Pattern?

Instead of services, objects, or elements calling each other, we will put a mediator in the middle. The mediator acts like an airport traffic control tower that knows how we want our services to communicate with each other.

| <img src="https://1.bp.blogspot.com/-e3NyxU-BK50/YPbDRLqxZRI/AAAAAAAADPM/MvodKSt9SqMWPw7jSA4qVX_JFXFW77oZgCLcBGAsYHQ/s0/Mediator%2Bas%2Ba%2Btraffic%2Bcontrol%2Btower.png" alt="Mediator as a traffic control tower" style="zoom:25%;" /> | <img src="https://1.bp.blogspot.com/-ltBHJk_GGlo/YPbD_DiL0WI/AAAAAAAADPY/YtFPsfc1pLMAevIy7e4JwQSs9NyRjWMIQCLcBGAsYHQ/s0/MediatR%2Bis%2Ban%2Bimplementation%2Bof%2Bthe%2Bmediator%2Bpattern.png" alt="MediatR is an implementation of the mediator pattern" style="zoom:25%;" /> |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|             Mediator as a traffic control tower              |     MediatR is an implementation of the mediator pattern     |

All your controllers will only have a single dependency, which is the MediatR package. Each one of your actions will just call a method, Mediator.send, and return a result, making your controllers slimmer than writing it without the CQRS pattern.

