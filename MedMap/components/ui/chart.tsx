import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useTheme } from "react-native-paper"
import { LineChart } from "react-native-chart-kit"
import { ChartConfig } from "../../types/chart"
import { ChartContextProps } from "../../types/context"
import { ChartTooltipContentProps, ChartLegendContentProps, ChartLineProps, ChartTooltipProps } from "../../types/component"

const screenWidth = Dimensions.get("window").width

const ChartContext = React.createContext<ChartContextProps | null>(null)

export type ChartContainerProps = {
  id?: string;
  className?: string;
  config: ChartConfig;
  children: React.ReactNode;
}

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = React.forwardRef<View, ChartContainerProps>(({
  id, className, children, config, ...props
}, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <View
        ref={ref}
        style={[styles.container]}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {children}
      </View>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return <Text style={{ color: "transparent" }}></Text>
}

const ChartTooltipContent = React.forwardRef<View, ChartTooltipContentProps>((props, ref) => {
  return (
    <View ref={ref} style={styles.tooltipContent}>
      <Text style={styles.tooltipText}>{props.label}</Text>
    </View>
  )
})
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegendContent = React.forwardRef<View, ChartLegendContentProps>(({
  payload, verticalAlign = "bottom", hideIcon = false
}, ref) => {
  return (
    <View ref={ref} style={[styles.legend, verticalAlign === "top" ? styles.top : styles.bottom]}>
      {payload.map((item) => (
        <View key={item.value} style={styles.legendItem}>
          {!hideIcon && <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />}
          <Text>{item.name}</Text>
        </View>
      ))}
    </View>
  )
})
ChartLegendContent.displayName = "ChartLegend"

// ✅ Rewritten using `react-native-chart-kit`
const ChartLine = ({ data }: ChartLineProps) => {
  return (
    <View style={styles.chart}>
      <LineChart
        data={{
          labels: data.map((_, index) => `${index + 1}`),
          datasets: [{ data }]
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          borderRadius: 8
        }}
      />
    </View>
  )
}

const ChartTooltip = ({ payload }: ChartTooltipProps) => {
  return (
    <View style={styles.tooltip}>
      {payload.map((item: any, index: number) => (
        <Text key={index} style={styles.tooltipText}>
          {item.name}: {item.value}
        </Text>
      ))}
    </View>
  )
}

const ChartLegend = ({ payload }: { payload: any[] }) => {
  return (
    <View style={styles.legend}>
      {payload.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorIndicator, { backgroundColor: item.payload.fill || item.color }]} />
          <Text>{item.name}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tooltip: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  tooltipText: {
    fontSize: 14,
    color: "#333",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: 50,
  },
  top: {
    paddingBottom: 10,
  },
  bottom: {
    paddingTop: 10,
  },
  tooltipContent: {
    padding: 5,
  }
})

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartLine,
}
