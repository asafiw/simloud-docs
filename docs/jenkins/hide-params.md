# How to hide parameters from "build with parameters" screen

In order to hide unnecessary parameters from “build with parameters” screen, please follow these steps:

select the job you wish to remove parameters from • press the “configure” option in the job’s menu

scroll down to “this project is parameterized” option and press the cross button on the parameter you wish to remove

once the parameter is removed scroll down to the code of the pipeline and find the “parameters” block

comment the parameter you wish to remove by adding “//” next to the corresponding line

scroll further down to the lowest stage and find the corresponding parameter

change the appendix near the corresponding parameter from “params.GIT_REPO_URL” to “GIT_REPO_URL”

Change the following:

To the following:
