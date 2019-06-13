## USAGE

### Generate static styleguide
`npm run build` -- creates dist folder with styleguide documentation
OR
```bash
bazel run projects/styleguide:docker;
docker run -p 8080:80 --name styleguide bazel/projects/styleguide:docker;
open http://localhost:8080
```

### Using and contributing to styleguide
See Introduction section in styleguide documentation.
