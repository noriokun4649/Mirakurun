/*
   Copyright 2016 kanreisa

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import { Operation } from "express-openapi";
import { event } from "../../log";

export const get: Operation = (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200);

    req.setTimeout(1000 * 60 * 60); // 60 minutes
    req.once("close", () => {
        event.removeListener("data", _listener);
    });

    event.on("data", _listener);

    function _listener(data: string) {
        res.write(data + "\n");
    }
};

get.apiDoc = {
    tags: ["log", "stream"],
    operationId: "getLogStream",
    responses: {
        200: {
            description: "OK"
        },
        default: {
            description: "Unexpected Error"
        }
    }
};
