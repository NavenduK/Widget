import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { useAppSelector } from "../store/store";
import ImageRiskAssessment from "./ImageRisk";

HighchartsMore(Highcharts);

interface Props {
  handleSidebar: () => void;
}

const Dashboard = (props: Props) => {
  const { handleSidebar } = props;
  const widgets = useAppSelector((state) => state.widgets);

  const chartOptions1 = {
    chart: { type: "pie" },
    title: { text: "" },
    series: [
      {
        name: "Risks",
        data: [
          { name: "Failed", y: 1689, color: "#FF4D4F" },
          { name: "Warning", y: 681, color: "#FFC53D" },
          { name: "Not available", y: 36, color: "#F0F0F0" },
          { name: "Passed", y: 7253, color: "#73D13D" },
        ],
      },
    ],
  };

  const chartOptions2 = {
    chart: { type: "pie" },
    title: { text: "" },
    plotOptions: {
      pie: {
        innerSize: "60%",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Accounts",
        data: [
          { name: "Connected", y: 2, color: "#1890FF" },
          { name: "Not Connected", y: 2, color: "#D9D9D9" },
        ],
      },
    ],
  };

  return (
    <Box>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              CNAPP Dashboard
            </Typography>
          </Grid>

          {widgets.CSPM.filter((item) => item.selected).map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{item.name}</Typography>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={
                        parseInt(item.id) % 2 !== 0
                          ? chartOptions2
                          : chartOptions1
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Button fullWidth variant="outlined" onClick={handleSidebar}>
                  + Add Widget
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {widgets.Image.filter((item) => item.selected).map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <ImageRiskAssessment heading={item.name} name={item.text} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button fullWidth variant="outlined" onClick={handleSidebar}>
                + Add Widget
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
