import { Box, Typography, Grid } from "@mui/material";

interface RiskLevel {
  label: string;
  count: number;
  color: string;
}

interface Props {
  heading: string;
  name: string;
}

const riskLevels: RiskLevel[] = [
  { label: "Critical", count: 9, color: "#D32F2F" },
  { label: "High", count: 150, color: "#F57C00" },
  { label: "Medium", count: 573, color: "#FBC02D" },
  { label: "Low", count: 738, color: "#FFEB3B" },
];

const ImageRiskAssessment = (props: Props) => {
  const { heading, name } = props;
  const totalVulnerabilities = riskLevels.reduce(
    (total, level) => total + level.count,
    0
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", p: 2 }}>
      <Typography variant="h6">{heading}</Typography>
      <Typography variant="body1">{name} Total Vulnerabilities</Typography>

      <Box sx={{ display: "flex", mt: 2, mb: 1 }}>
        {riskLevels.map((level, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: level.color,
              width: `${(level.count / totalVulnerabilities) * 100}%`,
              height: 10,
              borderRadius:
                index === 0
                  ? "5px 0 0 5px"
                  : index === riskLevels.length - 1
                  ? "0 5px 5px 0"
                  : "none",
            }}
          />
        ))}
      </Box>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        {riskLevels.map((level, index) => (
          <Grid item xs={6} key={index}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ width: 12, height: 12, bgcolor: level.color, mr: 1 }}
              />
              <Typography variant="body2">
                {level.label} ({level.count})
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageRiskAssessment;
