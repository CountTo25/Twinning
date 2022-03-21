import Twinning from "./Core/Twinning";
import SomeRandomMicroservice from "./Microservices/SomeRandomMicroservice";

Twinning.run(3001);
Twinning.join(3002).as(SomeRandomMicroservice); //TODO: generator for classes